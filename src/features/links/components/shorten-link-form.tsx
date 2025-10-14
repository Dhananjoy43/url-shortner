"use client";

import { IconEdit, IconLink, IconTextCaption } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";

import { useCreateLink } from "@/features/links/api/use-create-link";
import { ShortLinkSchema } from "@/features/links/schema";
import { useShortenLinkStore } from "@/features/links/store/shorten-link-dialog-store";

export const ShortenLinkForm = () => {
  const createLinkMutation = useCreateLink();
  const { onClose } = useShortenLinkStore();

  const form = useForm({
    validators: {
      onSubmit: ShortLinkSchema,
    },
    defaultValues: {
      title: "",
      url: "",
      slug: "",
    },
    onSubmit: async ({ value }) => {
      createLinkMutation.mutate(value, {
        onSuccess: () => {
          form.reset();
          onClose();
        },
      });
    },
  });

  const isPending = createLinkMutation.isPending;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <FieldGroup>
          {/* Title Field */}
          <form.Field
            name="title"
            validators={{
              onChange: ShortLinkSchema.shape.title,
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      placeholder="Marketing Campaign, Product Launch"
                      disabled={isPending}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={cn(isInvalid && "border-destructive")}
                    />
                    <InputGroupAddon>
                      <IconTextCaption
                        className="text-muted-foreground"
                        size={18}
                      />
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Destination URL Field */}
          <form.Field
            name="url"
            validators={{
              onChange: ShortLinkSchema.shape.url,
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} required>
                    Destination URL
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      type="url"
                      placeholder="https://example.com/your-long-link"
                      autoComplete="url"
                      disabled={isPending}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={cn(isInvalid && "border-destructive")}
                    />
                    <InputGroupAddon>
                      <IconLink className="text-muted-foreground" size={18} />
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Custom Slug Field */}
          <form.Field
            name="slug"
            validators={{
              onChange: ShortLinkSchema.shape.slug,
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Custom Slug (Optional)
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id={field.name}
                      placeholder="promo-link"
                      disabled={isPending}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={cn(isInvalid && "border-destructive")}
                    />
                    <InputGroupAddon>
                      <IconEdit className="text-muted-foreground" size={18} />
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isPending}
        >
          {isPending ? <Spinner className="mr-2 size-4" /> : <IconLink />}
          {isPending ? "Shortening..." : "Shorten Link"}
        </Button>
      </form>
    </motion.div>
  );
};
