const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5001; // 🚀 포트는 5001로 변경
const KAKAO_API_KEY = "eea204b2b87c0c28273fd26981ee45f9"; // 🔑 여기에 본인 Kakao REST API 키 입력

app.use(cors());
app.use(express.json());

let startPoints = []; // 출발지 저장 배열

// ✅ 출발지 추가 API
app.post("/locations", (req, res) => {
  const { lat, lng } = req.body;
  if (!lat || !lng) {
    return res.status(400).json({ error: "Invalid coordinates" });
  }
  startPoints.push({ lat, lng });
  res.json({ message: "출발지 저장 완료", startPoints });
});

// ✅ 출발지 목록 조회 API
app.get("/locations", (req, res) => {
  res.json({ startPoints });
});

// ✅ 출발지 초기화 API
app.delete("/locations", (req, res) => {
  startPoints = [];
  res.json({ message: "출발지 초기화 완료" });
});

// ✅ 최적의 모임 위치 추천 API
app.post("/api/findMeetingPoint", async (req, res) => {
  try {
    const { startPoints, candidates } = req.body;
    let results = [];

    for (const candidate of candidates) {
      let totalTime = 0;

      for (const start of startPoints) {
        const response = await axios.get(
          "https://apis-navi.kakaomobility.com/v1/directions",
          {
            headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
            params: {
              origin: `${start.lng},${start.lat}`,
              destination: `${candidate.lng},${candidate.lat}`,
              priority: "RECOMMEND",
            },
          }
        );

        const duration = response.data.routes[0].sections.reduce(
          (acc, section) => acc + section.duration,
          0
        );
        totalTime += duration;
      }

      results.push({ candidate, totalTime });
    }

    results.sort((a, b) => a.totalTime - b.totalTime);
    res.json(results[0]); // 가장 적절한 위치 반환

  } catch (error) {
    console.error("추천 위치 계산 오류:", error);
    res.status(500).send("추천 위치 계산 오류");
  }
});

// ✅ 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
