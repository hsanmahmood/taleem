import { useState } from 'react'

export default function Upload() {
    const [file, setFile] = useState(null)
    const [courseId, setCourseId] = useState('')
    const [status, setStatus] = useState('idle')

    function handleFileChange(e) {
        setFile(e.target.files[0])
    }

    async function handleUpload() {
        if (!file || !courseId) return setStatus('error')

        const formData = new FormData()
        formData.append('file', file)
        formData.append('course_id', courseId)

        try {
            setStatus('uploading')
            const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
                method: 'POST',
                body: formData
            })

            if (!res.ok) throw new Error()
            setStatus('success')
        } catch {
            setStatus('error')
        }
    }

    return (
        <div className="min-h-screen p-6 font-tajawal">
            <h1 className="text-2xl font-bold mb-6">رفع ملف</h1>

            {status === 'success' && <p className="text-green-600 mb-4">تم رفع الملف بنجاح!</p>}
            {status === 'error' && <p className="text-red-500 mb-4">حدث خطأ، حاول مرة أخرى.</p>}

            <input
                type="text"
                placeholder="أدخل معرف المادة"
                value={courseId}
                onChange={e => setCourseId(e.target.value)}
                className="w-full border rounded p-3 mb-4 font-tajawal"
            />

            <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full mb-2"
            />

            <p className="text-sm text-gray-500 mb-6">
                {file ? file.name : 'لم يتم اختيار ملف'}
            </p>

            <button
                onClick={handleUpload}
                disabled={status === 'uploading'}
                className="w-full bg-blue-600 text-white rounded p-3 font-bold font-tajawal"
            >
                {status === 'uploading' ? 'جارٍ الرفع...' : 'رفع'}
            </button>
        </div>
    )
}   