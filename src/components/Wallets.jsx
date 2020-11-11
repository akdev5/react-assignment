import React, { useState } from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import clsx from 'clsx'
import {
  ExpandMore, Launch, HowToVote, ImportExport,
} from '@material-ui/icons'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const Wallets = ({ wallets }) => {
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  if (Object.entries(wallets).length === 0) {
    return null
  }

  return (
    <div className={clsx('Wallets w-full px-2 sm:px-4')}>
      { Object.entries(wallets).map((entry) => {
        const [id, wallet] = entry
        return (
          <Accordion className="my-1" key={id} expanded={expanded === id} onChange={handleChange(id)}>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls={`${id}-content`} id={`${id}-header`}>
              <p className="break-all text-sm sm:text-md">{id}</p>
            </AccordionSummary>
            <AccordionDetails>
              <div className="w-full flex items-center justify-around text-theme-primary-500 text-xs sm:text-base">
                <Link className="flex items-center cursor-pointer" to={`/transactions/${wallet.address()}`}>
                  <ImportExport className="mx-1" fontSize="small" />
                  <p>Transactions</p>
                </Link>
                <div className="flex items-center cursor-pointer">
                  <Launch className="mx-1" fontSize="small" />
                  <a href={wallet.explorerLink()} target="_blank" rel="noreferrer">Explorer</a>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        )
      }) }
    </div>
  )
}

export default Wallets
