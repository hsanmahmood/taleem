from flask import Blueprint, request, jsonify
from services.supabase import supabase
from datetime import datetime
from zoneinfo import ZoneInfo

presentation_bp= Blueprint('presentation', __name__)

@presentation_bp.route('/presentation/<file_id>', methods=['PATCH'])
def update_presentation(file_id):
    try: 
        body = request.get_json()
        current_slide = body.get('current_slide')
        session_code = body.get('session_code')

        if current_slide is None:
            return jsonify({"error": "Slide number is required"}), 400

        if not session_code:
            return jsonify({"error": "Session code is required"}), 400

        bahrain = datetime.now(ZoneInfo("Asia/Bahrain"))

        supabase.table('presentation_states').upsert({
            'file_id': file_id,
            'session_code': session_code,
            'current_slide': current_slide,
            'timestamp': bahrain.isoformat()
        }).execute()

        return jsonify({"message": "Presentation updated"}), 200

    except Exception as e:
        print(f"Unable to update presentation: {e}")
        return jsonify({"error": "Something is broken"}), 500