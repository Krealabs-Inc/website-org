"use client"

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HeroProps {
  /** Main heading text */
  title: string | ReactNode
  /** Optional subtitle/description */
  description?: string | ReactNode
  /** Optional CTA buttons or other actions */
  actions?: ReactNode
  /** Background variant */
  variant?: 'gradient' | 'primary' | 'secondary' | 'simple' | 'image'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Text alignment */
  align?: 'left' | 'center'
  /** Maximum width container */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full'
  /** Optional background image URL (only used with variant="image") */
  backgroundImage?: string
  /** Additional className */
  className?: string
  /** Optional children for custom content */
  children?: ReactNode
  /** Enable animations */
  animated?: boolean
}

const sizeClasses = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32',
  xl: 'py-32 md:py-40',
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
  gradient: 'bg-gradient-to-br from-primary/10 via-background to-background',
  primary: 'bg-gradient-to-br from-primary to-purple-600 text-white',
  secondary: 'bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black',
  simple: 'bg-background',
  image: 'relative bg-cover bg-center bg-no-repeat',
}

export function Hero({
  title,
  description,
  actions,
  variant = 'gradient',
  size = 'lg',
  align = 'center',
  maxWidth = 'lg',
  backgroundImage,
  className,
  children,
  animated = true,
}: HeroProps) {
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

  const content = (
    <div className="container mx-auto px-4 md:px-6 relative z-10">
      <div
        className={cn(
          'mx-auto space-y-6',
          maxWidthClasses[maxWidth],
          align === 'center' ? 'text-center' : 'text-left'
        )}
      >
        {/* Title */}
        {typeof title === 'string' ? (
          <motion.h1
            className={cn(
              'text-h1',
              variant === 'primary' && 'text-white'
            )}
            variants={animated ? itemVariants : undefined}
          >
            {title}
          </motion.h1>
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
                  'text-body-lg',
                  variant === 'primary'
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

        {/* Actions */}
        {actions && (
          <motion.div
            className={cn(
              'flex flex-wrap gap-4',
              align === 'center' ? 'justify-center' : 'justify-start'
            )}
            variants={animated ? itemVariants : undefined}
          >
            {actions}
          </motion.div>
        )}

        {/* Custom Children */}
        {children && (
          <motion.div variants={animated ? itemVariants : undefined}>
            {children}
          </motion.div>
        )}
      </div>
    </div>
  )

  return (
    <section
      className={cn(
        'relative',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      style={
        variant === 'image' && backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      {/* Overlay for image variant */}
      {variant === 'image' && (
        <div className="absolute inset-0 bg-black/50 z-0" />
      )}

      {animated ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {content}
        </motion.div>
      ) : (
        content
      )}
    </section>
  )
}

/**
 * Smaller hero variant for internal pages
 */
export function HeroSimple({
  title,
  description,
  className,
}: {
  title: string
  description?: string
  className?: string
}) {
  return (
    <Hero
      title={title}
      description={description}
      variant="gradient"
      size="md"
      align="center"
      maxWidth="lg"
      className={className}
    />
  )
}

/**
 * CTA-focused hero with gradient background
 */
export function HeroCTA({
  title,
  description,
  actions,
  className,
}: {
  title: string
  description?: string
  actions: ReactNode
  className?: string
}) {
  return (
    <Hero
      title={title}
      description={description}
      actions={actions}
      variant="primary"
      size="lg"
      align="center"
      maxWidth="xl"
      className={className}
    />
  )
}
