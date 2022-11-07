# Creable Developer Assessment

This project is made for the Software Developer assessment and is based on the specifications given [here](https://creableio.notion.site/Coding-Challenge-Full-Stack-a3fffea292674299b24db85e496e6c4c) The project uses [Tailwind CSS](https://tailwindcss.com/) with Next.js.

## Changes from the specs

All the functionality from the specs has been implemented, except the UI for the grid on the results page is not 100% according to the provided Figma mockups due to time constraints.

## Challenges faced

Most of the application was normal but I did have some difficulty finding a reliable and **_free_** TikTok API that provided all the data we needed.
If doing this project again, I would try and use the tailwind config more than I did this time to specify a unified UI template throughout the application. Other than this I am pretty ok with this project at an assessment level.

## Backend

Most of the app logic is in the front-end, with the backend only querying and relaying the 3rd party API. I wanted to eliminate the backend as a whole because there were only 2 http calls but there were some issues with CORS with the 3rd party api so I made a rudamentary backend in .Net Core and deployed it in Azure via CI/CD. The front-end is also configured with CI/CD with Netlify and Github actions.

## Bonus features

I wasn't able to get to writing tests for the application but the app is configured to use shareable links, i.e. if you copy the link from the results page and open it in any other browser, the information returned would be the same.
