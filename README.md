<p align="center">
  <img src="picsReadme/crown.png" width="418px" alt="Crown logo" />
</p>

<h3 align="center">A tallying system for beauty pageants or other similar contests.</h3>
<p align="center">For when you have to keep track of 3 entities: Contentants, Judges, and Criteria; at the same time keep Scores and Rank them.</p>

## Deployment

The recommended way to launch the App is via **Docker** and **docker-compose** (you can ofcourse build from source if you're planning to customize) so you'll have to install those dependencies first.

Assuming you have Docker and docker-compose installed, lets start with making a directory for the app

```bash
mkdir crown
```

Inside the created directory create a `docker-compose.yml` file.

See `docker-compose.yml` file example below.

```yml
version: "3"
services:
  next:
    container_name: crown
    image: gregbasera/crown:2.4 # check dockerhub for updated version
    ports:
      - "3000:3000"
    depends_on:
      - "data"

  data:
    container_name: crowndb
    image: gregbasera/crowndb:1.1 # check dockerhub for updated version
    volumes:
      - ./database:/usr/src/app/.tmp
    ports:
      - "1337:1337"
```

Run the compose file with the command below. This will pull app images from DockerHub and run it.

```bash
docker compose up -d
```

The app should be running now, but before you can use it you'll need to configure the backend a bit (Strapi's _roles_ and _permissions_).

First create an administrator for the database. Go to [localhost](http://localhost:1337/admin)

<p align="center">
  <img src="picsReadme/admin.png" width="418px" alt="create admin" />
</p>

Proceed to _Settings > Users & Permissions plugin > Roles > Public_

Tick/Allow all permissions for **Con**, **Cri**, **Jud**, **Score**, and **Misc**.

<p align="center">
  <img src="picsReadme/permissions.png" width="418px" alt="edit permissions" />
</p>

**Save** it.

If everything goes well, you should be able to go to [localhost](http://localhost:3000/) and login.

At first init you should be able to just click on _Proceed_ and reach the server UI. From there you can set necessary settings you'll need for the app.

- Server is on _http://SERVER-IP-HERE:3000/server_
- Client is on _http://SERVER-IP-HERE:3000/client_
- Strapi is on _http://SERVER-IP-HERE:1337/admin_

## Limitations

- This project is not meant to be scaled. UI/UX will not support it. (Exceed the recommended settings at your own risk)
  - Recommended:
    - less than 40 Contestants
    - less than 10 Judges
    - less than 7 Criteria
  - Work-arounds:
    - you can full-screen the browser with F11
    - you can zoom-out the browser and sacrifice readability
      - Firefox and Chrome can zoom-out down to 30% and 25% respectively
    - you can use a bigger monitor, a wide-screen TV or even a projector and scale it better.
- Judges can only score in the scale of 1-10; 1 the lowest, 10 the highest; decimal notation not allowed.
  - Criteria can not hold any modifying value or weights. All scores are taken purely as a scale from 1-10
- Computations are done using a _rank-based_ system.
  - Each Judge have their own preference on how he/she scores Contestants from scale of 1-10.
  - The system ranks scores per judge. This removes personal biases from each judge.
  - The ranking generated is then used to calculate for the results.
- _Coronation_ (if enabled) will not take into account any scores from any _Criteria_.
  - the last criteria, _Coronation_, is built-in by default. This is an entirely seperate criteria
  - In a way, you can say that any Contestant who enters _Coronation_ starts again from 0
- _Ties_ are ALWAYS honored by the system.
  - if there are 5 Contestants that received the 1st place, the system will tell you as is.
- Strapi limits the number of entries returned per query. `PaginationLimit` is set to `4000` for a fix.
  - if you exceed the recommended settings youll need to build a new docker-image from source and change `PaginationLimit` to something larger.

## Dev Notes

- I recommend disabling _Coronation_ at the start of the contest until it is needed. This is to prevent judges from accidentaly posting a score on it.
- There is a known bug where pressing multiple keys in the client UI will trigger multiple score entries for the same criteria. This then made ranking in-effective. This was patched and a _"check"_ is put in place. But the patch is untested. If the _"check"_ caught the bug you'll need to correct it from strapi manually.
- If you need to reset the whole database, delete the `database` directory created during _compose up_. **Make sure that the Container is not running before you delete.** When the Container launched again it will create a fresh database.
- I realize that the system is quite declarative and it would take some workarounds to work with it. The thing is every contest is different, there's really not a standard to it.

## Gallery

The Welcome view.

<p align="center">
  <img src="picsReadme/crown-welcome-view.png" width="418px" alt="welcome view" />
</p>

The client view. The view where Judges will input scores. Its mobile-friendly

<p align="center">
  <img src="picsReadme/crown-client-view.png" width="418px" alt="welcome view" />
</p>

The server view. The Admin's view. (there is actually a bug here; in the finalist table; this is because I didn't disable Coronation at start. easily fixable)

<p align="center">
  <img src="picsReadme/crown-server-view.png" width="418px" alt="welcome view" />
</p>

The report view. printable right from the browser; with spaces so Judges can confirm and sign it.

<p align="center">
  <img src="picsReadme/crown-report-view.png" width="418px" alt="welcome view" />
</p>

## Questions and Feedback

_basera.gg@gmail.com_
