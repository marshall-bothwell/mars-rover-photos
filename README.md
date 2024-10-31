# Important Note:

As of mid-October 2024, this site no longer functions because NASA's Mars Rover Photos API's manifests endpoint does not return data anymore. I may modify the site to work without the manifest data at some point, but in the meantime I am hoping that the manifests endpoint may work again in the future.

# Search Photos

- Select a rover and a date to view all photos taken by the rover on the date

- Dates are filtered automatically using NASA's Manifest API - The date picker component will only allow selections where photos are available

- Search results are lazy-loaded using an infinite-scroll loader and are filterable by the rover's available cameras

# Save Photos

- Create an account with email/password or sign in through GitHub
  
- While signed in, you can save photos to your profile page

- Profile pages are viewable by anyone, so you can share your saved photos through a link to your profile page

---

<sub>Made with Next.js 14</sub>  

<sub>Hosted at [marsroverphotos.app](https://marsroverphotos.app)</sub>
