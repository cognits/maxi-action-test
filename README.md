# Hello world javascript action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `action`

**Required** The action to perform:
`generate` Generate a new version
`query` Query the latest version in the current branch

### `counter`

**Required** Wether to generate using a subcounter

## Outputs

### `version`

The generated or queried version, depending on the action

## Example usage

```yaml
uses: actions/hello-world-javascript-action@e76147da8e5c81eaf017dede5645551d4b94427b
with:
  do-counter: true
```


