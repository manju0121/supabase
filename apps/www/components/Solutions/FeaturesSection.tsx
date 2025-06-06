import React, { FC } from 'react'

import { cn } from 'ui'
import SectionContainer from '~/components/Layouts/SectionContainer'
import type { Feature, WhySection } from '~/data/solutions/solutions.types'

const Support: FC<WhySection> = (props) => {
  return (
    <SectionContainer id={props.id} className="flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col gap-2">
        <span className="label">{props.label}</span>
        <h2 className="h2 text-foreground-lighter">{props.heading}</h2>
      </div>
      <ul className="grid grid-cols-1 gap-4 gap-y-10 md:grid-cols-3 md:gap-12 xl:gap-20">
        {props.features?.map((feature, index) => <FeatureItem feature={feature} key={index} />)}
      </ul>
    </SectionContainer>
  )
}

interface FeatureItemProps {
  feature: Feature
}

const FeatureItem: FC<FeatureItemProps> = ({ feature }) => {
  const Icon = feature.icon
  const iconSize = 7
  const iconWidth = `w-${iconSize}`
  const iconHeight = `h-${iconSize}`

  return (
    <li className="flex flex-col gap-2 text-sm">
      {Icon && (
        <Icon className={cn('stroke-1 mb-2 text-foreground-lighter', iconWidth, iconHeight)} />
      )}
      <div className="w-full h-px overflow-hidden flex items-start bg-border-muted">
        <span className={cn('h-full bg-foreground-lighter', iconWidth)} />
      </div>
      <h4 className="text-foreground text-lg lg:text-xl mt-1">{feature.heading}</h4>
      <p className="text-foreground-lighter text-sm">{feature.subheading}</p>
      {/* <TextLink hasChevron label="Read story" url={feature.url} className="mt-4" /> */}
    </li>
  )
}

export default Support
