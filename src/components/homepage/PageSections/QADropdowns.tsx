'use client'
import React from 'react'
import hydrationData from '@/constants/homepage/QADropdowns.json'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useInView, useSpring, animated } from 'react-spring'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
/**
 * This section is on part using the accordion component given by shadcdn
 * more details here
 * https://ui.shadcn.com/docs/components/accordion
 */
function QADropdowns() {
  const [ref, inView] = useInView({ once: true })

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    delay: 200, // You can adjust the delay as needed
  })
  return (
    <animated.article
      ref={ref}
      className="flex w-full flex-col items-center justify-center rounded-3xl bg-cyan-100 py-[5vh] lg:py-[10vh] align-middle dark:bg-neutral-950 lg:rounded-[60px]"
      style={fadeIn}
    >
      <Accordion
        type="single"
        collapsible
        className="flex w-full max-w-[700px] flex-col gap-y-8 px-8"
      >
        {hydrationData.questions.map((question) => (
          <AccordionItem
            className="w-full "
            key={question.question}
            value={question.question}
          >
            <AccordionTrigger className="w-full border-b-[1px] border-black text-left font-serif text-2xl text-cyan-950 dark:border-white dark:text-cyan-300">
              {question.question}
            </AccordionTrigger>
            <AccordionContent className="py-4 font-sans">
              {question.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
        <SubmitQuestion />
      </Accordion>
    </animated.article>
  )
}

export default QADropdowns
const formSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, 'Email is required'),
  question: z.string().min(1, { message: 'Question is required' }),
})

type fieldValues = z.infer<typeof formSchema>

/**
 * This component puts an accordion element that lets users submit their question. It uses react hook form plus zustand to handle the form submit
 */
const SubmitQuestion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<fieldValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: fieldValues) => {
    console.log(data)
    // Handle form submission here
  }
  return (
    <AccordionItem className=" w-full " value={`Have any more questions?`}>
      <AccordionTrigger className="w-full border-b-[1px] border-black text-center  dark:border-white dark:text-cyan-300 font-serif text-2xl text-cyan-800">
        {`Have any more questions?`}
      </AccordionTrigger>
      <AccordionContent className=" flex flex-col py-4 font-sans">
        <p className="pl-2 font-serif ">
          Submit your question and your email here and we will get you
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex w-full flex-col"
        >
          <div className="flex min-h-[85px] w-full flex-col">
            <label
              htmlFor="email-input "
              className="relative mb-1 ml-2 text-stone-400   "
            >
              Your email address
            </label>
            <div className="relative w-full">
              <input
                className="w-full dark:text-black rounded-md border-stone-400 py-1 pl-6 shadow-md shadow-stone-400 transition-all duration-300  hover:outline-stone-800"
                id="email-input"
                {...register('email')}
              />
              <p className="absolute left-2 top-1/2 -translate-y-1/2 text-stone-400  ">
                @
              </p>
            </div>

            {errors.email && (
              <p className="my-1 ml-4 text-red-500">{`${errors?.email?.message}`}</p>
            )}
          </div>
          <div className="flex min-h-[85px] w-full flex-col">
            <label
              htmlFor="question-input "
              className="mb-1 ml-2 text-stone-400   "
            >
              Your question
            </label>
            <textarea
              className="rounded-md dark:text-black border-stone-400 py-1 pl-6 shadow-md shadow-stone-400 transition-all duration-300  hover:outline-stone-800"
              id="question-input"
              {...register('question')}
            />
            {errors.question && (
              <p className="my-1 ml-4 text-red-500">{`${errors?.question?.message}`}</p>
            )}
          </div>
          <div className="flex w-full items-center justify-center align-middle">
            <button
              className="mt-8 rounded-3xl bg-cyan-400 px-10 py-1  font-handwriting text-lg text-cyan-900 transition-all duration-300 hover:bg-cyan-300 "
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </AccordionContent>
    </AccordionItem>
  )
}
