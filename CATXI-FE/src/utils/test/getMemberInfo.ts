export const getMemberName = (memberId: number): string => {
  switch (memberId) {
    case 1:
      return '';
    case 2:
      return 'skybluekmg@gmail.com';
    default:
      return '테스트용_디폴트_NAME';
  }
};

export const getJwtToken = (memberId: number): string => {
  switch (memberId) {
    case 1:
      return 'eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzIiwibWVtYmVybmFtZSI6Iuy1nOuvvOyImCIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3NDkxMDgzNjcsImV4cCI6MTc0OTExMTk2N30.4G-zAcU8x9IEHvVCaeKhJ88TAPICkA-w4eiQzQ_nIX8';
    case 3:
      return 'eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzIiwibWVtYmVybmFtZSI6IuqzoOuvvOq3oCIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3NDkxMDU2MTYsImV4cCI6MTc0OTEwOTIxNn0.8Vj7GMhWvm0lz11qnmE_-4Bv0s1ob8w3qVI2kC5x6aI';
    default:
      return '테스트용_디폴트_JWT';
  }
};
