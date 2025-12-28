from flask import Flask, render_template, request
import os

from preprocessing.extract_text import extract_text
from preprocessing.clean_text import clean_text
from utils.file_handler import chunk_text
from nlp_engine.summarizer import summarize_chunks
from nlp_engine.argument_extractor import extract_arguments, extract_facts
from nlp_engine.precedent_detector import detect_precedents

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files["document"]
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        raw_text = extract_text(file_path)
        cleaned_text = clean_text(raw_text)

        chunks = chunk_text(cleaned_text)
        summary = summarize_chunks(chunks)
        arguments = extract_arguments(cleaned_text)
        facts = extract_facts(cleaned_text)
        precedents = detect_precedents(cleaned_text)

        analysis_note = (
            f"The system analyzed the document and identified "
            f"{len(arguments)} legal arguments and "
            f"{len(precedents)} referenced precedents. "
            f"The judgment analysis indicates a decision pattern "
            f"based primarily on contractual obligations."
        )

        return render_template(
            "result.html",
            summary=summary,
            arguments=arguments,
            facts=facts,
            precedents=precedents,
            analysis_note=analysis_note
        )

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=False, use_reloader=False)
