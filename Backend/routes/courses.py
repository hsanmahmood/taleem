import random
import uuid

from flask import Blueprint, jsonify, request
from services.supabase import supabase

courses_bp = Blueprint("courses", __name__)


@courses_bp.route("/course/create", methods=["POST"])
def init_course():
    try:
        body = request.get_json()
        course_id = body.get("course_id")
        course_name = body.get("course_name")

        if not course_id:
            return jsonify({"error": "course_id is required"}), 400

        course_uuid = str(uuid.uuid5(uuid.NAMESPACE_DNS, course_id))

        existing = (
            supabase.table("courses")
            .select("session_code, course_name")
            .eq("course_id", course_uuid)
            .execute()
        )

        if existing.data:
            return jsonify(
                {
                    "course_id": course_id,
                    "course_name": existing.data[0]["course_name"],
                    "session_code": existing.data[0]["session_code"],
                }
            ), 200

        session_code = str(random.randint(100, 999))

        supabase.table("courses").insert(
            {
                "course_id": course_uuid,
                "course_name": course_name or course_id,
                "session_code": session_code,
            }
        ).execute()

        return jsonify(
            {
                "course_id": course_id,
                "course_name": course_name or course_id,
                "session_code": session_code,
            }
        ), 201

    except Exception as e:
        print(f"Error creating course: {e}")
        return jsonify({"error": "Something is broken"}), 500
