import { ClipboardIcon } from '@heroicons/react/16/solid'
import PropTypes from 'prop-types'
import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import Button from '../Button'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const CodeBlock = ({ codeString, language }) => {
  return (
    <div className="relative">
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
          label="Copy"
          onClick={() => navigator.clipboard.writeText(codeString)}
        />
      </header>
    </div>
  )
}

CodeBlock.propTypes = {
  codeString: PropTypes.string.isRequired,
  language: PropTypes.oneOf(SyntaxHighlighter.supportedLanguages),
}

export default CodeBlock
