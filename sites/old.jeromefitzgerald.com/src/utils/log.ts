function log(message: string, data?: any) {
  console.log('\x1b[33m%s\x1b[0m', `log   - ${message}`, !!data ? data : '')
}

export { log }
