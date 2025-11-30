"use server";

export async function generateAltText(imageData: string) {
  async function query(data: any) {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  const response = await query({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Give alt text in 2-5 words for this image",
          },
          {
            type: "image_url",
            image_url: {
              url: imageData,
            },
          },
        ],
      },
    ],
    model: "Qwen/Qwen3-VL-8B-Instruct:novita",
  });

  const altText = response.choices?.[0]?.message?.content || "No alt text generated";

  console.log("Alt Text:", altText);
  return altText;
}