import passport, { Strategy } from "passport"


type TypeStrategy<T, U, X> = { new (params: U, callback: X): T }


/**
 * PassportUse is a function that takes a name, a strategy, some parameters, and a callback, and uses
 * them to create a new strategy.
 * @param {string} name - The name of the strategy.
 * @param Strategy - The strategy you want to use.
 * @param {U} params - U
 * @param {X} callback
 * 
 * @author Carlos Páez
 */
export function PassportUse<T extends Strategy, U, X>(name: string, Strategy: TypeStrategy<T, U, X>, params: U, callback: X) {
    passport.use(name, new Strategy(params, callback))
}