from flask import Blueprint, request, jsonify
from services.supabase import supabase
from config import SUPABASE_BUCKET
import uuid

upload_bp= Blueprint('upload', __name__)

@upload_bp.route('/upload', methods=['POST'])
def upload_file():
    try:
        file= request.files.get('file')
        course_id= request.form.get('course_id')

        if not file:
            return jsonify({"error": "No file provided"}), 400

        if not course_id:
            return jsonify({"error": "No course_id provided"}), 400

        file_id= str(uuid.uuid4())
        filename= file.filename
        file_type= file.content_type
        file_path= f"{course_id}/{file_id}/{filename}"

        supabase.storage.from_(SUPABASE_BUCKET).upload(file_path, file.read())

        supabase.table('files').insert({
            'file_id': file_id,
            'file_name': filename,
            'file_type': file_type,
            'course_id': course_id,
        }).execute()

        return jsonify({"message": "File uploaded!"}), 201

    except Exception as e:
        print(f"Upload error: {e}")
        return jsonify({"error": "Something is broken"}), 500