const colors = [
      "#FFF3B0", "#FFE66D", "#FFFACD", "#FFADAD", "#FFD6A5", "#FDFFB6", "#A0C4FF", "#FFDDC1", "#FFC6FF",
      "#FEC8D8", "#F1C0E8", "#C1FFD7", "#A8DADC", "#F4A261", "#C1FFD7", "#F1FAEE", "#A8DADC", "#A8DADC",
      "#00BBF9", "#FEE440", "#00F5D4", "#B5EAEA", "#EDF6E5", "#FFBCBC", "#D0F4DE", "#A9DEF9", "#E4C1F9",
      "#FFC09F", "#FFEE93", "#FCF5C7", "#FFCAD4", "#B0DAFF", "#CDF0EA", "#FFF5BA", "#FFB5E8", "#8EC5FC",
      "#D0F0C0", "#F1C0E8", "#FFDEB4", "#FFADBC", "#FFC3A0", "#FF9AA2", "#E4BAD4", "#FF9AA2", "#FFB7B2",
      "#D5AAFF", "#C3F584", "#7AFDD6", "#C2E9FB", "#F1E0FF", "#FFDEE9", "#E3FDFD", "#CBF1F5", "#A6E3E9",
      "#B7F0AD", "#FFD6EC", "#FFDFD3", "#FFF6F6", "#FFE4E1", "#F8C8DC", "#FDCB82", "#E4F9F5", "#8EC5FC",
      "#BFF098", "#6FD6FF", "#FDA7DC", "#FFDDC1", "#FFABAB", "#FFC3A0", "#FFF0F5", "#FFD6E8", "#C3B1E1",
      "#DFFFD6", "#F6DFEB", "#F9F871", "#FCF8E8", "#D4E2D4", "#FAEDCD", "#C2F0FC", "#B2EBF2", "#B9FBC0",
      "#FFFAE3", "#E4F9F5", "#FFEEE4", "#FEE2F8", "#E0BBE4", "#E0BBE4", "#E3DFFF", "#D6E0F0", "#FFDCF3",
      "#D3F8E2", "#E4C1F9", "#F694C1", "#FADADD", "#FFD6EC", "#F6E6F3", "#FDFFFC", "#D0F4DE", "#A9DEF9",
      "#FFF3B0", "#FFCF99", "#FEC8D8", "#F6DFEB", "#D0E6A5", "#FFD3B6", "#FAF3DD", "#C8D5B9", "#FFE66D",
      "#FFD1DC", "#FFAACF", "#FF8AAE", "#FFF1E6", "#FFCAD4", "#D1E8E2", "#F4EAD5", "#F7DAD9", "#FFF3E3",
      "#FFECF5", "#FFC9DE", "#FFB3C6", "#FFDDC1", "#FAF3E0", "#D6EADF", "#D8E2DC", "#FFE5D9", "#FFCAD4",
      "#FFF9EC", "#FCE1E4", "#F7DBF0", "#FFD5EC", "#F7B2BD", "#FEC8D8", "#FEE2E2", "#FCD5CE", "#FAE1DD",
      "#CDEAC0", "#F0E6EF", "#DAD2BC", "#F7F6CF", "#E3F2FD", "#FFECB3", "#FFDEEB", "#F3D1F4", "#F6E6F3",
      "#E0F7FA", "#D1C4E9", "#F8BBD0","#F9F871", "#ACE7FF", "#FFD1BA"
    ]
    
    
export function getColor() {
        return colors[Math.floor(Math.random() * colors.length)]
  }
  
  // Copyright 2025 Darshan Aguru