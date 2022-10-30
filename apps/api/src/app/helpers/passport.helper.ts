import { User, getUserById } from '../schemas/user.schema';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class PassportHelper {
  static init(passport): void {
    passport.use(new Strategy({
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer")
    }, (jwt_payload, done) => {
      getUserById(jwt_payload.user._id, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }))
  }
}
