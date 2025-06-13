export const locationLabelMap: Record<string, string> = {
  MARIA: "니콜스/마리아관",
  LIBRARY: "중앙 도서관 (베리타스관)",
  DASOL: "다솔관",
  CONCERT_HALL: "콘서트홀",
  PHARMACY: "약학관",
  SOSA_ST: "소사역",
  BUCHEON_ST: "부천역",
  YEOKGOK_ST: "역곡역",
  GURO_ST: "구로역",
  SINDORIM_ST: "신도림역",
  STUDENT_CENTER: "학생회관 (소피아바관)",
};
export const labelToLocationMap: Record<string, string> = Object.fromEntries(
  Object.entries(locationLabelMap).map(([key, value]) => [value, key])
);
