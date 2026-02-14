import * as z from 'zod'

// TypeScript se ejecuta en Build Time
// Zod se ejecuta en Runtime
const jobSchema = z.object({
    titulo: z.string({error: 'El titulo es requerido'})
            .min(3, 'El titulo debe tener al menos 3 caracteres')
            .max(100, 'El titulo no puede tener más de 100 caracteres'),
    empresa: z.string(),
    ubicacion: z.string(),
    descripcion: z.string().optional(),
    data: z.object({
        technology: z.array(z.string()),
        modalidad: z.string(),
        nivel: z.string(),
    })
})

export function validateJob(input) {
    return jobSchema.safeParse(input)
}

export function validatePartialJob(input) {
    return jobSchema.partial().safeParse(input)
}