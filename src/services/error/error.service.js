/**
 * ERROR STRATEGY
 * 
 * Delegate error handling by severity (1 = highest, = lowest)
 * 
 * SEVERITY 1: FATAL ERROR
 * DESCRIPTION: error likely will crash the app and make recovery difficult if not impossible
 * REMEDY:
 *  - display error page to user
 *  - submit error report
 *  - clear state/storage and restart app
 * EXAMPLE: this will certainly result from me coding something wrong
 * 
 * SEVERITY 2: LOSSY ERROR
 * DESCRIPTION: error is likely recoverable, but last action should be discarded
 * REMEDY:
 *  - display error page to user
 *  - submit error report
 *  - cancel previous action (if necessary) and roll back state/storage
 *  - navigate to home
 * EXAMPLE: loss of server communication when sending a request that is required to continue
 * 
 * SEVERITY 3: LOSSLESS ERROR
 * DESCRIPTION: error is recoverable and should not have created a persisting change; user should have access to remedy
 * REMEDY: display error toast
 * EXAMPLE ERROR: user failed login due to invalid username/password
 */

import { Subject } from 'rxjs'

import { reportError as httpReportError } from './http/error-http'

const errorSubject$ = new Subject()

function reduceErrorReports(args) {
  return args.reduce(
    (acc, curr) => {
      const keyVals = Object.getOwnPropertyNames(curr)
        .map(key => ({ [key]: curr[key] }))
        .reduce((innerAcc, innerCurr) => ({ ...innerAcc, ...innerCurr }))

      return {
        ...acc,
        ...keyVals
      }
    },
    {}
  )
}

async function reportError(error) {
  const args = Array.from(arguments)
  const report = args.length === 1 ? error : reduceErrorReports(args)
  console.log('reporting error', report)
  // TODO: add error reporting route to server
  // await httpReportError(error)
}

function setError(error) {
  errorSubject$.next(error)
}

function clearError() {
  errorSubject$.next(null)
}

const error$ = errorSubject$.asObservable()

export { error$, setError, reportError, clearError }
