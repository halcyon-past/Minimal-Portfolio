# EDUHELPER: Chat with PDF Files

This Streamlit application allows users to upload PDF files and ask questions based on their content. The application utilizes the Google Generative AI API for text embedding and question answering.

## Prerequisites

- Python 3.x
- Required Python packages: streamlit, PyPDF2, langchain, google.generativeai, dotenv
- Google API Key (with access to the Generative AI API)

## Check Live

[Check EDUHELPER Live](https://eduprovider.streamlit.app/)

## Installation

1. Clone the repository or download the source code.
2. Install the required Python packages by running the following command:<br>
   ```pip install -r requirements.txt```
3. Create a `.env` file in the project directory and add your Google API Key:<br>
   ```GOOGLE_API_KEY=your_google_api_key```
## Usage

1. Run the Streamlit application by executing the following command:
   ```streamlit run app.py```
2. The application will open in your default web browser.
3. Upload one or more PDF files by clicking the "Upload your PDF Files and Click on the Submit & Process Button" button in the sidebar.
4. Click the "Submit & Process" button to process the uploaded PDF files.
5. Once the processing is complete, you can enter your question in the text input field and press Enter.
6. The application will search for relevant information in the PDF files and provide an answer based on the context.

## Functions

- `get_pdf_text(pdf_docs)`: Extracts text from the provided PDF files.
- `get_text_chunks(text)`: Splits the text into smaller chunks for efficient embedding and retrieval.
- `get_vector_store(text_chunks)`: Creates a vector store (FAISS index) from the text chunks using Google Generative AI Embeddings.
- `get_conversational_chain()`: Initializes the conversational chain for question answering using the Google Generative AI Chat model.
- `user_input(user_question)`: Processes the user's question, retrieves relevant documents from the vector store, and generates an answer using the conversational chain.
- `main()`: The main function that sets up the Streamlit application and handles user interactions.

## Dependencies

- Streamlit: A Python library for building interactive web applications.
- PyPDF2: A pure Python library for reading and writing PDF files.
- LangChain: A framework for building applications with large language models.
- Google Generative AI: Google's Generative AI API for text embedding and generation.
- FAISS: A library for efficient similarity search and clustering of dense vectors.
- python-dotenv: A Python library for reading key-value pairs from a `.env` file.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or inquiries, please contact [Aritro Saha](mailto:aritrosaha2025@gmail.com).
