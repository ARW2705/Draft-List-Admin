function buildWorker(worker) {
  const code = worker.toString()
  const blob = new Blob([`(${code})()`])
  return new Worker(URL.createObjectURL(blob))
}

export default buildWorker
