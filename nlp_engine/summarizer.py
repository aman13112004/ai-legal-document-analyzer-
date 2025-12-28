from transformers import pipeline

summarizer = pipeline(
    "summarization",
    model="facebook/bart-large-cnn"
)

def summarize_chunks(chunks):
    summaries = []
    for chunk in chunks[:5]:
        result = summarizer(
            chunk,
            max_length=150,
            min_length=60,
            do_sample=False
        )
        summaries.append(result[0]["summary_text"])
    return " ".join(summaries)
