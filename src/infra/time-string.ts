export function showJavaLocalDataToYYYYMMDD(dateStr: string): string {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
}