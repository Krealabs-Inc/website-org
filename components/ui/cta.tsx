"use client"

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CTAButton {
  text: string
  href: string
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  icon?: ReactNode
}

interface CTAProps {
  /** Main heading */
  title: string | ReactNode
  /** Optional description */
  description?: string | ReactNode
  /** Primary CTA button */
  primaryCTA: CTAButton
  /** Optional secondary CTA button */
  secondaryCTA?: CTAButton
  /** Variant style */
  variant?: 'section' | 'banner' | 'card' | 'simple'
  /** Background style */
  background?: 'gradient' | 'primary' | 'muted' | 'none'
  /** Text alignment */
  align?: 'left' | 'center'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Additional className */
  className?: string
  /** Enable animations */
  animated?: boolean
}

const sizeClasses = {
  sm: {
    section: 'py-12 md:py-16',
    title: 'text-h3',
    description: 'text-body',
  },
  md: {
    section: 'py-16 md:py-24',
    title: 'text-h2',
    description: 'text-body-lg',
  },
  lg: {
    section: 'py-20 md:py-32',
    title: 'text-h1',
    description: 'text-body-lg',
  },
}

const backgroundClasses = {
  gradient: 'bg-gradient-to-br from-primary/10 via-background to-background',
  primary: 'bg-gradient-to-br from-primary to-purple-600 text-white',
  muted: 'bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black',
  none: 'bg-transparent',
}

export function CTA({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  variant = 'section',
  background = 'gradient',
  align = 'center',
  size = 'md',
  className,
  animated = true,
}: CTAProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const renderButton = (cta: CTAButton, isPrimary: boolean = false) => (
    <Button
      variant={cta.variant || (isPrimary ? 'default' : 'outline')}
      size={size === 'sm' ? 'default' : size === 'lg' ? 'xl' : 'lg'}
      asChild
    >
      <Link href={cta.href}>
        {cta.text}
        {cta.icon || (isPrimary && <ArrowRight className="w-4 h-4 ml-2" />)}
      </Link>
    </Button>
  )

  const content = (
    <motion.div
      className={cn(
        'space-y-6',
        align === 'center' ? 'text-center' : 'text-left'
      )}
      initial={animated ? 'hidden' : undefined}
      whileInView={animated ? 'visible' : undefined}
      viewport={{ once: true, margin: '-100px' }}
      variants={animated ? containerVariants : undefined}
    >
      {/* Title */}
      {typeof title === 'string' ? (
        <motion.h2
          className={cn(
            sizeClasses[size].title,
            background === 'primary' && 'text-white'
          )}
          variants={animated ? itemVariants : undefined}
        >
          {title}
        </motion.h2>
      ) : (
        <motion.div variants={animated ? itemVariants : undefined}>
          {title}
        </motion.div>
      )}

      {/* Description */}
      {description && (
        <>
          {typeof description === 'string' ? (
            <motion.p
              className={cn(
                sizeClasses[size].description,
                background === 'primary'
                  ? 'text-white/90'
                  : 'text-muted-foreground'
              )}
              variants={animated ? itemVariants : undefined}
            >
              {description}
            </motion.p>
          ) : (
            <motion.div variants={animated ? itemVariants : undefined}>
              {description}
            </motion.div>
          )}
        </>
      )}

      {/* Buttons */}
      <motion.div
        className={cn(
          'flex flex-wrap gap-4',
          align === 'center' ? 'justify-center' : 'justify-start'
        )}
        variants={animated ? itemVariants : undefined}
      >
        {renderButton(primaryCTA, true)}
        {secondaryCTA && renderButton(secondaryCTA, false)}
      </motion.div>
    </motion.div>
  )

  // Section variant - full-width section
  if (variant === 'section') {
    return (
      <section
        className={cn(
          sizeClasses[size].section,
          backgroundClasses[background],
          className
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className={cn('mx-auto', align === 'center' ? 'max-w-4xl' : 'max-w-5xl')}>
            {content}
          </div>
        </div>
      </section>
    )
  }

  // Banner variant - compact horizontal layout
  if (variant === 'banner') {
    return (
      <div
        className={cn(
          'py-6 md:py-8',
          backgroundClasses[background],
          className
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 space-y-2">
              {typeof title === 'string' ? (
                <h3 className={cn('text-h3', background === 'primary' && 'text-white')}>
                  {title}
                </h3>
              ) : (
                title
              )}
              {description && (
                <>
                  {typeof description === 'string' ? (
                    <p
                      className={cn(
                        'text-body',
                        background === 'primary' ? 'text-white/90' : 'text-muted-foreground'
                      )}
                    >
                      {description}
                    </p>
                  ) : (
                    description
                  )}
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              {renderButton(primaryCTA, true)}
              {secondaryCTA && renderButton(secondaryCTA, false)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Card variant - contained in a card
  if (variant === 'card') {
    return (
      <div
        className={cn(
          'rounded-xl border border-gray-200 dark:border-gray-800 p-8 md:p-12',
          backgroundClasses[background],
          className
        )}
      >
        {content}
      </div>
    )
  }

  // Simple variant - no wrapper
  return <div className={className}>{content}</div>
}

/**
 * Compact inline CTA with just buttons
 */
export function CTAInline({
  primaryCTA,
  secondaryCTA,
  className,
}: {
  primaryCTA: CTAButton
  secondaryCTA?: CTAButton
  className?: string
}) {
  return (
    <div className={cn('flex flex-wrap gap-4', className)}>
      <Button variant="default" size="lg" asChild>
        <Link href={primaryCTA.href}>
          {primaryCTA.text}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </Button>
      {secondaryCTA && (
        <Button variant="outline" size="lg" asChild>
          <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
        </Button>
      )}
    </div>
  )
}

/**
 * Banner CTA for quick actions
 */
export function CTABanner({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  className,
}: Omit<CTAProps, 'variant'>) {
  return (
    <CTA
      title={title}
      description={description}
      primaryCTA={primaryCTA}
      secondaryCTA={secondaryCTA}
      variant="banner"
      background="gradient"
      align="left"
      size="sm"
      className={className}
    />
  )
}

/**
 * Full section CTA with gradient background
 */
export function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  background = 'primary',
  className,
}: Omit<CTAProps, 'variant'>) {
  return (
    <CTA
      title={title}
      description={description}
      primaryCTA={primaryCTA}
      secondaryCTA={secondaryCTA}
      variant="section"
      background={background}
      align="center"
      size="md"
      className={className}
    />
  )
}
