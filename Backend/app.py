from flask import Flask
from flask_cors import CORS
from routes.upload import upload_bp
from routes.presentation import presentation_bp
from routes.files import files_bp

app= Flask(__name__)
CORS(app)

app.register_blueprint(upload_bp)
app.register_blueprint(presentation_bp)
app.register_blueprint(files_bp)

if __name__ == '__main__':
    app.run(debug=True)