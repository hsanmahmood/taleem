from flask import Blueprint, jsonify
from services.supabase import supabase
from config import SUPABASE_BUCKET

files_bp= Blueprint('files', __name__)

@files_bp.route('/files/<session_code>', methods=['GET'])
def get_files(session_code):
    try:
        course = supabase.table('courses').select('course_id').eq('session_code', session_code).execute()        
        if not course.data:
            return jsonify({"error": "Wrong session code"}), 404

        course_id= course.data[0]['course_id']  
        files= supabase.table('files').select('*').eq('course_id', course_id).execute()  

        return jsonify({"files": files.data}), 200

    except Exception as e:
        print(f"Error fetching files: {e}")
        return jsonify({"error": "Something broken"}), 500


@files_bp.route('/file/<file_id>', methods=['GET'])
def get_file(file_id):
    try:
        file= supabase.table('files').select('*').eq('file_id', file_id).execute()

        if not file.data:
            return jsonify({"error": "File not found"}), 404

        file_data= file.data[0]
        file_path= f"{file_data['course_id']}/{file_data['file_id']}/{file_data['file_name']}"

        signed_url= supabase.storage.from_(SUPABASE_BUCKET).create_signed_url(file_path, 3600)

        return jsonify({"url": signed_url['signedURL']}), 200

    except Exception as e:
        print(f"Get file error: {e}")
        return jsonify({"error": "Something broken"}), 500       