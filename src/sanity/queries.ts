import { groq } from "next-sanity";

export const fetchTestDocument = () => {
  return groq`
        *[_type == "testDocument"][] {
            "images": images[].->asset,
        }
    `;
};
