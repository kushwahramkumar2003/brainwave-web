import { useState } from "react";
import { z } from "zod";
import { Plus } from "lucide-react";
import { toast, Toaster } from "sonner";

import Input from "./ui/input";
import Button from "./ui/button";
import Dialog, { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import Select, {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Badge from "./ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addContent } from "../services/contentServices";

export const AddContentSchema = z.object({
  link: z.string().url().nonempty("URL is required"),
  type: z.enum(["document", "tweet", "youtube", "link"]),
  title: z.string().min(1, "Title is required"),
  tags: z.array(z.string()),
});

const TagInput = ({
  tags,
  onAddTag,
  onRemoveTag,
}: {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}) => {
  const [currentTag, setCurrentTag] = useState("");

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      onAddTag(currentTag.trim());
      setCurrentTag("");
      toast.success(`Tag "${currentTag.trim()}" added`);
    } else if (tags.includes(currentTag.trim())) {
      toast.error(`Tag "${currentTag.trim()}" already exists`);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          label=""
          name="tag-input"
          //@ts-ignore
          register={() => {}}
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          placeholder="Add tags"
          className="flex-grow"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTag();
            }
          }}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddTag}
          startIcon={<Plus size={16} />}
        >
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            removable
            onRemove={() => {
              onRemoveTag(tag);
              toast.success(`Tag "${tag}" removed`);
            }}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export const AddContentModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<string>("link");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (tag: string) => {
    setTags([...tags, tag]);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const queryClient = useQueryClient();

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: addContent,
    onSuccess: () => {
      toast.success("Content added successfully");
      onOpenChange(false);
      // Reset form fields
      setLink("");
      setTitle("");
      setType("link");
      setTags([]);
      queryClient.invalidateQueries({ queryKey: ["all-notes"] });
    },
    onError: (error) => {
      toast.error(`Failed to add content: ${error.message}`);
    },
  });

  const handleSubmit = async () => {
    try {
      const validatedData = AddContentSchema.parse({ link, type, title, tags });
      await mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(`${err.path.join(".")}: ${err.message}`);
        });
      } else {
        console.error("Validation Error:", error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <Dialog.Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Content Type
              </label>
              <Select.Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="link">Link</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="tweet">Tweet</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                </SelectContent>
              </Select.Select>
            </div>

            <Input
              label="URL"
              name="link"
              //@ts-ignore
              register={() => {}}
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com"
            />

            <Input
              label="Title"
              name="title"
              //@ts-ignore
              register={() => {}}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter content title"
            />

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <TagInput
                tags={tags}
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="secondary"
                onClick={() => {
                  onOpenChange(false);
                  toast.info("Content addition cancelled");
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit} isLoading={isLoading}>
                Add Content
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog.Dialog>
    </>
  );
};

export default AddContentModal;
