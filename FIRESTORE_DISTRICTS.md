# District content

Two sources, one per content type:

- **Photos** — bundled with the site from `images/<district>/` (named `1`, `2`, …).
- **Result lists** (selected / waitlisted) — read from Firestore, one collection
  per district.

Nothing is written by the site; you manage the Firestore lists in the Firebase
console and the photos in the repo.

## Photos

Drop the images into a folder named after the district:

```
images/
  kathmandu/ 1.jpg  2.jpg     -> Kathmandu Valley
  jumla/     1.jpeg 2.jpeg    -> Jumla
  kailali/   1.jpg  2.jpg     -> Kailali
```

File names are sorted numerically, so `1` comes before `2` (and before `10`).
Any of `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif` works. Vite picks these up via
`import.meta.glob` in `src/lib/progress.js` — no code change is needed to add
photos, but the images **must be committed to git** so the deployed build
includes them (they are bundled at build time).

Where they appear:

- District page (`/nafo/<district>`) "Photos" section: every photo in the folder.
  These are the only place photos appear.

## Result lists

```
<collection>/selected    -> { names: [...] }
<collection>/waitlisted  -> { names: [...] }
```

`<collection>` is the district's collection name:

| District         | Page URL                 | Collection  | Images folder |
| ---------------- | ------------------------ | ----------- | ------------- |
| Kathmandu Valley | `/nafo/kathmandu-valley` | `kathmandu` | `kathmandu`   |
| Jumla            | `/nafo/jumla`            | `jumla`     | `jumla`       |
| Dolpa            | `/nafo/dolpa`            | `dolpa`     | `dolpa`       |
| Jhapa            | `/nafo/jhapa`            | `jhapa`     | `jhapa`       |
| Kailali          | `/nafo/kailali`          | `kailali`   | `kailali`     |
| Parsa            | `/nafo/parsa`            | `parsa`     | `parsa`       |
| Morang           | `/nafo/morang`           | `morang`    | `morang`      |
| Kavre            | `/nafo/kavre`            | `kavre`     | `kavre`       |

The mapping lives in `src/lib/progress.js` (`districts[].collection`). If you
add a district, add it there **and** to the list in `firestore.rules`.

Accepted `names` shapes (the site reads the first field it finds):

| Value                                          | Example                          |
| ---------------------------------------------- | -------------------------------- |
| array of strings *(recommended)*                | `["Ram Sharma", "Sita Rai"]`     |
| array of objects                                | `[{ "name": "Ram", "school": "ABC School" }]` |
| comma / newline separated string                | `"Ram Sharma, Sita Rai"`         |
| map of name → school                            | `{ "Ram Sharma": "ABC School" }` |

Field names accepted: `names`, `name`, `students`, `participants`, `results`,
`list`.

If a document is missing or empty, the page falls back to clearly-marked
placeholder rows.

## Security rules

Reads are public; writes are closed (`firestore.rules`):

```
match /{district}/{id} {
  allow read: if district in ["kathmandu", "jumla", ...];
  allow write: if false;
}
```

Publish rule changes with `firebase deploy --only firestore:rules`.

## Checklist to add a district's lists

1. Create the collection, e.g. `kathmandu`.
2. Add document `selected` with a `names` field.
3. Add document `waitlisted` with a `names` field.
4. `firebase deploy --only firestore:rules` (once, after adding a new
   collection name to the list).
