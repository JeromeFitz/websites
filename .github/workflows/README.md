# GitHub Workflows

## Security Notice

To access a privately scoped GitHub Package that is not in this repo you must use a `PERSONAL_ACCESS_TOKEN` and not a `GITHUB_TOKEN`.

This is 🥁️ stupid 🥁️.

So `PAT` need to be created with only `read:package` and should be fine.

But we'll see I guess.

### Example

- `@jeromefitz/semantic` calling itself? `GH_TOKEN`
- `@jeromefitz/website` calling `@jeromefitz/semantic`? `PERSONAL_ACCESS_TOKEN`

### Idea

Stupid (again) but make the `GH_TOKEN` be the `PERSONAL_ACCESS_TOKEN` if you are not using it for anything else.

Though again. Stupid.
