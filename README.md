# Holy Quran with Colorful Tajweed Anotation

This project is still on progress. The main goal is to make Static Quran website complete with tajweed anotation.

## Source

For now we use Quran data from [kemenag](https://quran.kemenag.go.id/). We will add other version later.

## Developing

### Package Manager

We are using pnpm for node package manager, so you should install it first to run this project.
`npm install -g pnpm`

Once you've created a project and installed dependencies with `pnpm install` (or `pnpm i`), start a development server:

```bash
pnpm dev
```

## Building

This project using `svelte-kit` and `@sveltejs/adapter-static` for easy deployment on cloudflare page. To build on your local macine, please run

```bash
pnpm build
```

Then just serve the `/build` folder
