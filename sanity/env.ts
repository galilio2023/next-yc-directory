export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-12-19'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

/**
 * Ensures the provided value is defined and returns it.
 *
 * @param v - The value to validate; must not be `undefined`.
 * @param errorMessage - Message for the thrown Error when `v` is `undefined`.
 * @returns The validated value `v`.
 * @throws Error when `v` is `undefined`, using `errorMessage`.
 */
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}