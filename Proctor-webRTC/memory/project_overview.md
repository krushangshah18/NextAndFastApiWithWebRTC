---
name: proctor_project_overview
description: AI exam proctoring system - FastAPI + WebRTC backend, NextJS frontend planned, EC2 g4dn.2xlarge deployment
type: project
---

AI exam proctoring system at /home/krushang/Desktop/NextAndFastApiWithWebRTC/Proctor-webRTC/

**Why:** Deploy on EC2 g4dn.2xlarge (T4 GPU, 8 vCPU, 32 GB RAM), maximize concurrent candidates per instance.

**Stack:** FastAPI + aiortc (WebRTC), YOLO (finalBestV5.pt), MediaPipe FaceMesh, Silero VAD, NextJS frontend (planned, replacing HTML/JS).

**Key decisions:**
- No continuous MP4/WAV session recording (removed)
- No drawing/bounding boxes/overlays in production (removed)
- Proof: single JPEG per alert + WAV audio clip for speaker_audio only (no video proof)
- Admin monitors one candidate at a time via /snapshot/{pc_id}
- Tick rate: 10 Hz (was 15 Hz) for higher candidate capacity
- Max sessions: 40 per instance
- Configurable detections per exam via detection_config in /offer request body
- Gaze detection (DETECT_LOOKING_SIDE) when disabled → refine_landmarks=False in MediaPipe (saves compute)

**How to apply:** Any new feature should avoid adding drawing, video recording, or full-frame processing. Keep all detection output as JSON/data, not visual annotations.
