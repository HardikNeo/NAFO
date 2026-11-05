# Images

Organized by purpose:

| Folder        | Contents                                              |
| ------------- | ----------------------------------------------------- |
| `branding/`   | Site logo                                             |
| `documents/`  | Authentication document shown on the About page       |
| `home/`       | Homepage illustrations (Sowell portraits, Raymond Hull) |
| `team/`       | Team member photos                                    |
| `dolpa/`      | Dolpa district photos                                 |
| `jumla/`      | Jumla district photos                                 |
| `kailali/`    | Dhangadhi (Kailali) district photos                   |
| `kathmandu/`  | Kathmandu Valley district photos                      |
| `kavre/`      | Kavre district photos                                 |

District photos are loaded automatically by `src/lib/progress.js` from their
district folder. Team and homepage photos are imported directly by the
components or through `src/lib/teamPhotos.js` and `src/lib/homeImages.js`.
