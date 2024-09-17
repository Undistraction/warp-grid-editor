import { ClipboardIcon } from '@heroicons/react/16/solid'
import PropTypes from 'prop-types'
import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import Button from '../Button'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const CodeBlock = ({ codeString, language, testId = undefined }) => {
  return (
    <div
      className="relative"
      data-tid={testId}
    >
      <SyntaxHighlighter
        language={language}
        style={docco}
        customStyle={{ paddingLeft: `1rem`, paddingRight: `1rem` }}
      >
        {codeString}
      </SyntaxHighlighter>
      <header className="absolute right-3 top-3">
        <Button
          icon={<ClipboardIcon />}
          testId="copy-code-button"
          label="Copy"
          onClick={() => {
            navigator.clipboard.writeText(codeString)
          }}
        />
      </header>
    </div>
  )
}

CodeBlock.propTypes = {
  codeString: PropTypes.string.isRequired,
  language: PropTypes.oneOf(SyntaxHighlighter.supportedLanguages),
  testId: PropTypes.string,
}

export default CodeBlock
