export function buildNicknameMap(
  emails: string[] = [],
  nicknames: string[] = []
): Record<string, string> {
  return emails.reduce((acc, email, i) => {
    acc[email] = nicknames[i];
    return acc;
  }, {} as Record<string, string>);
}

export function getHostNickname(
  hostEmail: string,
  emails: string[] = [],
  nicknames: string[] = []
): string {
  const idx = emails.findIndex(e => e === hostEmail);
  return idx !== -1 ? nicknames[idx] : hostEmail;
}
