"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { formSchema } from "@/lib/validation";

export const createPitch = async (
  state: { error: string; status: "INITIAL" | "SUCCESS" | "ERROR"; _id?: string },
  form: FormData,
  pitch: string,
) => {
  const session = await auth();
  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    // Server-side validation
    await formSchema.parseAsync({
      title,
      description,
      category,
      link,
      pitch,
    });

    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.user?.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (e) {
    console.log(e);
    return parseServerActionResponse({
      error: JSON.stringify(e),
      status: "ERROR",
    });
  }
};
