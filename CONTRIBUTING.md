# Contributing
Contributions are welcome and will be fully credited.

Please read and understand the contribution guide before creating an issue or pull request.

## Procedure
Before filing an issue:

Attempt to replicate the problem, to ensure that it wasn't a coincidental incident.
Check to make sure your feature suggestion isn't already present within the project.
Check the pull requests tab to ensure that the bug doesn't have a fix in progress.
Check the pull requests tab to ensure that the feature isn't already in progress.
Before submitting a pull request:

Check the codebase to ensure that your feature doesn't already exist.
Check the pull requests to ensure that another person hasn't already submitted the feature or fix.

## Topics

Each Issue has topic, for example

`[Tajweed] Complete Tajweed Anotation Kemenag Version`

If you want to create new issue, please add the topic

Common topics:
- Tajweed
- Bug
- Translation
- Feature Request

## Tajweed Generator
If you want to contribute to add tajweed anotation, you can use tajweed generator tool for help mapping tajweed

Just run this project on local

`pnpm run dev`

then visit http://localhost:3000/tajweed-generator

follow the instruction in that page. Select surah and aya, select text, then select class. After finish mapping tajweed rule, just copy and paste the json to json file on `src/db/....x.json`

## NOTE
please comment on issue or create new issue first before make PR to minimalize code conflict