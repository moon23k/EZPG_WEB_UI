import type { DetailData } from "../../details/data";
import type { TemplateMain } from "../../templates/types";
import type { Section } from "../../types";

const s = (kind: string, data: Record<string, unknown>): Section => ({ kind, v: 1, data });

const reviews = {
  average: 4.9,
  count: 128,
  items: [
    { rating: 5, body: "포장이 꼼꼼하고 설명대로였어요.", name: "김*희", date: "11월 2일" },
    { rating: 5, body: "두 번째 주문인데 이번에도 만족해요.", name: "이*준", date: "10월 28일" },
    { rating: 4, body: "생각보다 빨리 받았어요.", name: "박*아", date: "10월 21일" },
  ],
};

const pay = [
  { label: "예약금 · 지금", value: "50%" },
  { label: "잔금 · 7일 전", value: "50%" },
  { label: "7일 전 취소", value: "전액 환불" },
  { label: "3일 전 취소", value: "50% 환불" },
];

const sessions = [
  { id: "s1", date: "11월 9일 토", time: "10:30", name: "물레 입문", length: "3시간", status: "few" as const, seats_left: 2, href: "#" },
  { id: "s2", date: "11월 16일 토", time: "10:30", name: "물레 입문", length: "3시간", status: "open" as const, href: "#" },
  { id: "s3", date: "11월 23일 토", time: "14:00", name: "핸드빌딩", length: "2시간", status: "full" as const, href: "#" },
];

export const homeSections: Record<TemplateMain, Section[]> = {
  shop: [
    s("notice_bar", { text: "오늘 2시 전 주문은 오늘 발송해요" }),
    s("hero", { title: "계절을 담은 과일청", sub: "매주 들어오는 과일로 소량만 만듭니다.", button: "둘러보기", href: "/products" }),
    s("intro", { title: "작은 공방의 세 가지 그릇", body: "한 사람이 빚고 굽고 포장합니다.", button: "상품 보기", href: "/products" }),
    s("category_menu", {}),
    s("product_grid", { title: "베스트", lines: {} }),
    s("photo_band", { title: "한 병에 담은 계절" }),
    s("category_tiles", { items: [{ title: "과일청", href: "#" }, { title: "잼", href: "#" }, { title: "선물 세트", href: "#" }] }),
    s("curation", { title: "기획", items: [{ title: "가벼운 선물", href: "#" }, { title: "겨울 식탁", href: "#" }, { title: "혼자의 아침", href: "#" }, { title: "손님 초대", href: "#" }] }),
    s("store_info", { title: "서촌 쇼룸", address: "서울 종로구 자하문로 12", hours: "화–일 12:00–19:00", phone: "02-000-0000" }),
    s("story", { title: "우리 이야기", body: ["쌓아 두고 파는 일이 싫어서, 한 달에 팔 만큼만 만듭니다.", "남은 재료는 다음 달 소품으로 다시 만들어요."] }),
    s("testimonial", { quote: "선물했더니 어디서 샀냐는 말을 세 번 들었어요.", name: "김*희 · 자몽청" }),
    s("faq", {}),
  ],
  class: [
    s("hero", { title: "도자 공방 물레 수업", sub: "흙을 처음 만져도 괜찮아요.", button: "수업 보기", href: "#" }),
    s("next_session", { session: sessions[0] }),
    s("trust_line", { items: ["평점 4.9", "후기 243", "수강생 3,200명"] }),
    s("class_schedule", { title: "이번 달 수업", sessions }),
    s("class_list", {
      title: "클래스",
      classes: [
        { id: "k1", name: "물레 입문", chips: ["3시간", "입문"], price: "85,000원 · 1인", next: "다음 수업 11월 9일", href: "#" },
        { id: "k2", name: "핸드빌딩 원데이", chips: ["2시간", "입문"], price: "65,000원 · 1인", next: "다음 수업 11월 10일", href: "#" },
        { id: "k3", name: "8주 정규반", chips: ["8주", "중급"], price: "340,000원부터", next: "다음 개강 11월 6일", href: "#" },
      ],
    }),
    s("numbers", { items: [{ value: "2018", label: "개업" }, { value: "3,200", label: "수강생" }, { value: "4.9", label: "평점" }] }),
    s("process_steps", { steps: ["예약", "수업", "굽기", "수령"] }),
    s("gates", { items: [{ title: "원데이", href: "#" }, { title: "정규반", href: "#" }, { title: "단체 문의", href: "#" }] }),
    s("story", { title: "공방 소개", body: ["주 1회 정규반과 주말 원데이를 엽니다."] }),
    s("reviews", reviews),
    s("faq", {}),
  ],
  stay: [
    s("hero", { title: "바다 앞 독채", sub: "하루 한 팀만 받습니다.", button: "예약하기", href: "#" }),
    s("booking_strip", { price: "1박 206,000원부터", href: "#" }),
    s("search_bar", {}),
    s("spec_icons", { items: ["6인", "침실 3", "침대 4", "욕실 2"] }),
    s("intro", { title: "정원이 있는 한옥", body: "사랑채 · 안채 · 별채 세 채를 빌려 드립니다." }),
    s("story", { title: "숙소 소개", body: ["창을 열면 바로 바다가 보이는 이층 독채입니다."] }),
    s("gallery", { images: ["", "", ""] }),
    s("room_list", {
      rooms: [
        { id: "r1", name: "오션 스위트", specs: ["2~4인", "33㎡", "퀸 1"], price: "1박 180,000원부터", left: 2, href: "#" },
        { id: "r2", name: "가든 룸", specs: ["2인", "24㎡", "더블 1"], price: "1박 140,000원부터", left: 1, href: "#" },
        { id: "r3", name: "패밀리 룸", specs: ["4~6인", "45㎡", "퀸 2"], price: "1박 240,000원부터", href: "#" },
      ],
    }),
    s("room_box", { title: "객실", body: "마당을 가운데 둔 세 채", names: ["사랑채", "안채", "별채"], href: "#" }),
    s("amenities", {
      items: [
        { name: "와이파이", group: "기본" },
        { name: "주차", group: "기본" },
        { name: "바비큐", group: "야외" },
        { name: "정원", group: "야외" },
        { name: "조리 도구", group: "주방" },
        { name: "반려동물 동반", group: "기본" },
      ],
    }),
    s("house_rules", { check_in: "15:00", check_out: "11:00", rules: ["기준 4인 · 최대 6인", "실내 흡연 금지", "파티 불가"] }),
    s("pay_plan", { rows: pay }),
    s("location", { address: "제주 서귀포시 안덕면 00로 12", note: "주차 2대", href: "#" }),
    s("reviews", reviews),
  ],
  quote: [
    s("hero", { title: "우리 집 맞춤 시공", sub: "실측부터 마감까지 한 팀이 맡습니다.", button: "견적 보기", href: "/quote" }),
    s("intro", { title: "사진으로 말하는 스튜디오", body: "제품 · 공간 · 브랜드 촬영", button: "견적 받기", href: "/quote" }),
    s("trust_line", { items: ["평점 4.9", "후기 86", "작업 320건"] }),
    s("before_after", {}),
    s("case_grid", {
      title: "작업 사례",
      categories: ["전체", "주거", "상업", "부분"],
      cases: [
        { id: "c1", title: "성수 카페", meta: "상업 · 40평", href: "#" },
        { id: "c2", title: "마포 아파트", meta: "주거 · 32평", href: "#" },
        { id: "c3", title: "판교 사무실", meta: "상업 · 60평", href: "#" },
        { id: "c4", title: "연남 주택", meta: "주거 · 25평", href: "#" },
      ],
    }),
    s("case_cards", {
      title: "프로젝트",
      categories: ["전체", "광고", "인터뷰", "행사"],
      cases: [
        { id: "p1", title: "브랜드 필름", meta: "광고 · 2025 · 의뢰처", scope: "기획 · 촬영 · 편집 · 6주", href: "#" },
        { id: "p2", title: "대표 인터뷰", meta: "인터뷰 · 2025 · 의뢰처", scope: "촬영 · 편집 · 2주", href: "#" },
        { id: "p3", title: "출시 행사", meta: "행사 · 2024 · 의뢰처", scope: "현장 촬영 · 1일", href: "#" },
      ],
    }),
    s("price_tiers", { items: [{ label: "제품 컷", value: "10,000원부터" }, { label: "공간 촬영", value: "500,000원부터" }, { label: "브랜드 촬영", value: "별도 견적" }] }),
    s("package_cards", {
      tabs: ["사진", "영상", "패키지"],
      items: [
        { name: "작가 1명 본식", price: "490,000원", includes: ["원본 전체", "보정 50장"] },
        { name: "사진 · 영상 패키지", price: "880,000원", includes: ["사진 작가 1명", "영상 하이라이트 3분"] },
        { name: "2인 촬영", price: "740,000원", includes: ["작가 2명", "보정 80장"] },
      ],
    }),
    s("process_steps", { steps: ["문의", "견적", "예약금", "작업", "잔금"] }),
    s("reviews", reviews),
    s("faq", {}),
  ],
};

const days = (picked: number[], closed: number[], price: string) =>
  Array.from({ length: 30 }, (_, i) => i + 1).map((day) => ({
    day,
    price,
    state: picked.includes(day) ? ("picked" as const) : closed.includes(day) ? ("closed" as const) : ("open" as const),
  }));

export const detailData: Record<TemplateMain, DetailData> = {
  shop: {
    title: "자몽청 500ml",
    price: "18,000원",
    status: "재고 3개",
    ship: "발송 예정 11월 3일",
    rows: [
      { label: "배송비", value: "3,000원" },
      { label: "발송 예정", value: "2일 이내" },
      { label: "적립", value: "1%" },
    ],
    photo_reviews: ["", "", "", ""],
  },
  class: {
    title: "물레 입문",
    price: "85,000원 · 1인",
    chips: ["3시간", "입문"],
    rows: [
      { label: "수업 시간", value: "3시간" },
      { label: "정원", value: "6명" },
      { label: "수준", value: "입문" },
      { label: "형식", value: "하루" },
      { label: "가격", value: "85,000원" },
    ],
    sessions,
    steps: ["흙 준비", "물레", "다듬기", "굽기"],
    prep: [
      { title: "만드는 것", body: "컵 2개" },
      { title: "포함", body: "흙 · 유약 · 굽기" },
      { title: "챙길 것", body: "앞치마 · 편한 옷" },
    ],
    teacher: { name: "강사 김온기", body: "12년째 물레를 돌립니다." },
    curriculum: [
      { title: "1주 · 흙 다루기", body: "반죽과 중심 잡기" },
      { title: "2~3주 · 원통", body: "원통과 컵" },
      { title: "4~6주 · 그릇", body: "사발과 접시" },
      { title: "7~8주 · 유약", body: "시유와 굽기 · 작품 수령" },
    ],
    cohorts: [
      { title: "수요일 19:00–22:00", period: "11월 6일 – 12월 25일", count: "8회", status: "few", seats_left: 3, dates: ["11/6", "11/13", "11/20", "11/27", "12/4", "12/11", "12/18", "12/25"] },
      { title: "토요일 10:00–13:00", period: "11월 9일 – 12월 28일", count: "8회", status: "full", dates: ["11/9", "11/16", "11/23", "11/30", "12/7", "12/14", "12/21", "12/28"] },
    ],
    timetable: {
      days: ["월", "화", "수", "목", "금", "토"],
      rows: [
        { time: "10:00", open: [false, false, false, false, false, true] },
        { time: "19:00", open: [false, true, true, false, false, false] },
      ],
    },
    refund: [
      { label: "시작 3일 전", value: "100% 환불" },
      { label: "2일 전", value: "50% 환불" },
      { label: "1일 전", value: "30% 환불" },
      { label: "3명 미만", value: "자동 폐강 · 전액 환불" },
    ],
    location: { address: "서울 마포구 성미산로 00", note: "주차 1대", href: "#" },
    reviews,
  },
  stay: {
    title: "오션 스위트",
    price: "1박 180,000원부터",
    rows: [
      { label: "기준 · 최대", value: "2인 · 4인" },
      { label: "침대", value: "퀸 1" },
      { label: "면적", value: "33㎡" },
      { label: "전망", value: "바다" },
    ],
    steps: ["날짜", "연락처", "결제"],
    calendar: { month: "11월", days: days([10, 11, 12], [3, 4, 18, 19], "20.6만") },
    total: {
      rows: [
        { label: "2박", value: "412,000원" },
        { label: "청소비", value: "50,000원" },
        { label: "예약금 50%", value: "231,000원" },
      ],
      total: "462,000원",
      note: "입금 기한 6시간 · 지나면 자동 취소",
      button: "예약하기",
    },
    amenities: [
      { name: "와이파이" },
      { name: "주차" },
      { name: "바비큐" },
      { name: "조식" },
      { name: "정원" },
      { name: "반려동물 동반" },
    ],
    rules: { check_in: "15:00", check_out: "11:00", rules: ["기준 2인 · 최대 4인", "실내 흡연 금지"] },
    pay,
  },
  quote: {
    title: "성수 카페 공간 촬영",
    status: "2025 · 서울 성수",
    rows: [
      { label: "분류", value: "공간" },
      { label: "규모", value: "40평" },
      { label: "기간", value: "1일" },
      { label: "비용대", value: "80~120만원" },
    ],
    images: ["", "", "", "", ""],
    reviews: { average: 5, count: 1, items: [reviews.items[0]] },
    form: {
      steps: ["종류", "규모", "일정", "예산", "연락처"],
      groups: [
        { label: "종류", options: ["주거", "상업", "부분 시공"] },
        { label: "면적", options: ["20평대", "30평대", "40평대 이상"] },
        { label: "공정", options: ["도배", "바닥", "욕실", "주방"] },
      ],
      total: "1,850만원",
      button: "상담 신청",
    },
    estimate: {
      no: "No. 0012",
      valid: "유효 30일",
      items: [
        { label: "철거 · 목공", value: "6,200,000원" },
        { label: "도배 · 바닥", value: "4,800,000원" },
        { label: "욕실", value: "3,500,000원" },
      ],
      total: "14,500,000원",
      deposit: "1,450,000원",
      accept: "수락하고 예약금 결제",
    },
    pay,
  },
};
