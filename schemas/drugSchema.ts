import * as z from "zod";

export const DrugSchema = z.object({
  genericName: z
    .string()
    .min(1, { message: "Generic name is requird" })
    .min(3, { message: "Generic name should be at least 3 letters." })
    .max(25, { message: "Generic name should be at most 15 letters." }),

  tradeName: z
    .string()
    .min(1, { message: "Generic name is requird" })
    .min(3, { message: "Generic name should be at least 3 letters." })
    .max(25, { message: "Generic name should be at most 15 letters." }),

  dosageStrength: z
    .string()
    .min(1, { message: "Dosage strength is requird" })
    .min(3, { message: "Dosage strength should be at least 3 letters." })
    .max(8, { message: "Dosage strength should be at most 8 letters." }),

  dosageForm: z
    .string()
    .min(1, { message: "Dosage form is requird" })
    .min(3, { message: "Dosage form should be at least 3 letters." })
    .max(25, { message: "Dosage form should be at most 8 letters." }),

  price: z
    .number(),
    // .min(1, { message: "Price is requird" })
    // .min(3, { message: "Price should be at least 3 letters." })
    // .max(25, { message: "Price should be at most 5." }),

  description: z
    .string()
    .min(1, { message: "Description is requird" })
    .min(3, { message: "Description should be at least 3 letters." })
    .max(50, { message: "Description should be at most 50 letters." }),
});

export type DrugSchemaType = z.infer< typeof DrugSchema>
