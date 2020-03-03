# Project Version action

This is an opinated way to retrieve the Project Version of a Repository. The purpose of this action is to expose the 
project version as a context variable to be used across your Github Action Workflow.

It looks for a specific file in your Pull Request and retrieves the version from it. The file must only contain the 
version and nothing more.

This action is only intended to run with Pull Request events.

## Inputs

### `github-token`

**Required** The GitHub Token used to create an authenticated client. The Github Token is already set by the Github 
Action itself. Use this if you want to pass in your own Personal Access Token. 

**Default** `${{github.token}}`.

### `version-file-path`

**Required** The path to the file that contains the Project version.

## Outputs

### `project-version`

The Project Version. Read from the input file path.

## Example usage

```yaml
- uses: radcortez/project-version-action@master
  name: retrieve project version
  id: version
  with:
    github-token: ${{secrets.GITHUB_TOKEN}}
    version-file-path: '.github/release/version'
```

After this step, you can reference the Project Version with `${{steps.version.outputs.project-version}}`.
