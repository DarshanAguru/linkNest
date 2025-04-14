const colors = ["#ed5c5c", "#ed5c5c", "#f39c6b", "#f39c6b", "#f5a862", "#f5a862", "#f7ce68", "#f7ce68", "#ffe066", "#ffe066", "#a3e4db", "#a3e4db", "#90e0ef", "#90e0ef", "#8ed1fc", "#8ed1fc", "#caa8f5", "#caa8f5", "#fbb1bd", "#fbb1bd", "#ffd6a5", "#ffd6a5", "#d8f3dc", "#d8f3dc", "#ffafcc", "#ffafcc", "#ffc6ff", "#ffc6ff", "#d0f4de", "#d0f4de", "#f0efeb", "#f0efeb", "#fcd5ce", "#fcd5ce", "#fec89a", "#fec89a", "#c3f584", "#c3f584", "#c1d3fe", "#c1d3fe", "#25292e", "#25292e", "#25292e", "#25292e", "#25292e"]
export function getColor() {
        return colors[Math.floor(Math.random() * colors.length)]
  }
  
  // Copyright 2025 Darshan Aguru