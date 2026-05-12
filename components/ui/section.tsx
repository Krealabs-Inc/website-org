"use client"

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionProps {
  /** Section content */
  children: ReactNode
  /** Optional section title */
  title?: string | ReactNode
  /** Optional section description */
  description?: string | ReactNode
  /** Background variant */
  variant?: 'default' | 'gradient' | 'muted' | 'primary' | 'dark'
  /** Padding size */
  padding?: 'sm' | 'md' | 'lg'
  /** Maximum width container */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full'
  /** Text alignment for title/description */
  align?: 'left' | 'center'
  /** Add decorative gradient overlay */
  decorative?: boolean
  /** Decorative gradient color */
  decorativeColor?: 'primary' | 'secondary' | 'accent'
  /** Additional className */
  className?: string
  /** Container className */
  containerClassName?: string
  /** Enable animations */
  animated?: boolean
  /** Custom ID for section */
  id?: string
}

const paddingClasses = {
  sm: 'section-padding-sm',
  md: 'section-padding',
  lg: 'section-padding-lg',
}

const maxWidthClasses = {
  sm: 'max-w-2xl',
  md: 'max-w-3xl',
  lg: 'max-w-4xl',
  xl: 'max-w-5xl',
  '2xl': 'max-w-6xl',
  '3xl': 'max-w-7xl',
  '4xl': 'max-w-[90rem]',
  full: 'max-w-full',
}

const variantClasses = {
  default: 'bg-background',
  gradient: 'bg-gradient-to-br from-primary/10 via-background to-background',
  muted: 'bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black',
  primary: 'bg-gradient-to-br from-primary to-purple-600 text-white',
  dark: 'bg-gray-900 dark:bg-black text-white',
}

const decorativeGradients = {
  primary: 'bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent',
  secondary: 'bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent',
  accent: 'bg-gradient-to-b from-transparent via-rose-500/[0.02] to-transparent',
}

export function Section({
  children,
  title,
  description,
  variant = 'default',
  padding = 'md',
  maxWidth = '3xl',
  align = 'center',
  decorative = false,
  decorativeColor = 'primary',
  className,
  containerClassName,
  animated = true,
  id,
}: SectionProps) {
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

  return (
    <section
      id={id}
      className={cn(
        'relative',
        paddingClasses[padding],
        variantClasses[variant],
        className
      )}
    >
      {/* Decorative gradient overlay */}
      {decorative && (
        <div
          className={cn(
            'absolute inset-0 pointer-events-none',
            decorativeGradients[decorativeColor]
          )}
        />
      )}

      <div className={cn('container mx-auto px-4 md:px-6 relative z-10', containerClassName)}>
        <motion.div
          className={cn('mx-auto', maxWidthClasses[maxWidth])}
          initial={animated ? 'hidden' : undefined}
          whileInView={animated ? 'visible' : undefined}
          viewport={{ once: true, margin: '-100px' }}
          variants={animated ? containerVariants : undefined}
        >
          {/* Section Header */}
          {(title || description) && (
            <div
              className={cn(
                'mb-12 space-y-4',
                align === 'center' ? 'text-center' : 'text-left'
              )}
            >
              {title && (
                <>
                  {typeof title === 'string' ? (
                    <motion.h2
                      className={cn(
                        'text-h2',
                        variant === 'primary' && 'text-white',
                        variant === 'dark' && 'text-white'
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
                </>
              )}

              {description && (
                <>
                  {typeof description === 'string' ? (
                    <motion.p
                      className={cn(
                        'text-body-lg',
                        variant === 'primary'
                          ? 'text-white/90'
                          : variant === 'dark'
                          ? 'text-white/80'
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
            </div>
          )}

          {/* Section Content */}
          <motion.div variants={animated ? itemVariants : undefined}>
            {children}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Simple section wrapper without title/description
 */
export function SectionSimple({
  children,
  className,
  ...props
}: Omit<SectionProps, 'title' | 'description'>) {
  return (
    <Section className={className} {...props}>
      {children}
    </Section>
  )
}

/**
 * Section with decorative gradient - useful for feature sections
 */
export function SectionDecorative({
  children,
  title,
  description,
  className,
  ...props
}: SectionProps) {
  return (
    <Section
      title={title}
      description={description}
      decorative
      className={className}
      {...props}
    >
      {children}
    </Section>
  )
}

/**
 * Full-width section for content that needs to span the entire viewport
 */
export function SectionFullWidth({
  children,
  className,
  ...props
}: Omit<SectionProps, 'maxWidth' | 'containerClassName'>) {
  return (
    <Section
      maxWidth="full"
      containerClassName="px-0"
      className={className}
      {...props}
    >
      {children}
    </Section>
  )
}
