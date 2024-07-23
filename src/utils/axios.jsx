import axios from "axios"

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmM5NTNlNTliNmU4ZmU2YTM2YjU4YTY2YTkwYmM1NCIsIm5iZiI6MTcyMDM3NTk3MS43MzA1NjksInN1YiI6IjY2NzdmNWM4YmY4YjVmZmI0MmZjMjU3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5DzroAzoJy7bR0IhrnznMkuLDtoLMcNJ8YB2xcxPQLA'
      }
})

export default instance;