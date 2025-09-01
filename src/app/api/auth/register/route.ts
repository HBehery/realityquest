import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,36}$/;

export async function POST(request: Request) {
  try {
    const { email, username, password, fullName, age, ticket } =
      await request.json();

    if (
      (!username || !usernameRegex.test(username)) &&
      (!email || !emailRegex.test(email))
    ) {
      return NextResponse.json(
        {
          message: "Invalid email and username format",
          code: "INVALID_EMAIL_USERNAME_FORMAT",
        },
        {
          status: 400,
        }
      );
    }
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        {
          message: "Invalid email format",
          code: "INVALID_EMAIL_FORMAT",
        },
        {
          status: 400,
        }
      );
    }
    if (!username || !usernameRegex.test(username)) {
      return NextResponse.json(
        {
          message: "Invalid username format",
          code: "INVALID_USERNAME_FORMAT",
        },
        {
          status: 400,
        }
      );
    }
    if (!password) {
      return NextResponse.json(
        {
          message: "Password is required",
          code: "PASSWORD_REQUIRED",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await hash(password, 10);

    // Use a transaction to ensure all operations succeed together
    const client = await sql.connect();

    try {
      await client.query("BEGIN");

      // Insert into users table
      const response = await client.query(
        "INSERT INTO users (email, username, password, full_name, age, ticket) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [email, username, hashedPassword, fullName, age, ticket]
      );

      const userId = response.rows[0].id;

      // Insert mission 1 into missions table
      await client.query(
        "INSERT INTO missions (team_id, mission) VALUES ($1, $2)",
        [userId, 1]
      );

      // Insert mission 2 into missions table
      await client.query(
        "INSERT INTO missions (team_id, mission) VALUES ($1, $2)",
        [userId, 2]
      );

      // Insert mission 3 into missions table
      await client.query(
        "INSERT INTO missions (team_id, mission) VALUES ($1, $2)",
        [userId, 3]
      );

      // Commit the transaction if all operations succeed
      await client.query("COMMIT");
    } catch (transactionError) {
      // Rollback the transaction if any operation fails
      await client.query("ROLLBACK");
      throw transactionError; // Re-throw to be caught by the outer catch block
    } finally {
      // Release the client connection
      client.release();
    }

    // Insert the user themselves into team_members table, then add team members
    // await sql`
    // INSERT INTO team_members (team_id, member_name, member_email)
    // VALUES (${userId}, ${teamMembers[0].name}, ${email})
    // `;

    // if (teamMembers && Array.isArray(teamMembers) && teamMembers.length > 1) {
    //   for (const memberUsername of teamMembers) {
    //     if (memberUsername.name === teamMembers[0].name) {
    //       continue;
    //     }
    //     if (
    //       typeof memberUsername.email === "string" &&
    //       memberUsername.email.trim() !== "" &&
    //       emailRegex.test(memberUsername.email)
    //     ) {
    //       await sql`
    //       INSERT INTO team_members (team_id, member_name, member_email)
    //       VALUES (${userId}, ${memberUsername.name}, ${memberUsername.email})
    //       `;
    //     } else {
    //       return NextResponse.json(
    //         {
    //           message: "Invalid team member email",
    //           code: "INVALID_TEAM_MEMBER_EMAIL",
    //         },
    //         {
    //           status: 400,
    //         }
    //       );
    //     }
    //   }
    // }
  } catch (e: any) {
    console.log(e);
    if (e.code === "23505") {
      if (e.message.includes("users_lower_idx")) {
        return NextResponse.json(
          { message: "Email already exists", code: "EMAIL_EXISTS" },
          { status: 400 }
        );
      }
      if (e.message.includes("users_username_key")) {
        return NextResponse.json(
          { message: "Username already exists", code: "USERNAME_EXISTS" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { message: "An error occurred", code: "UNKNOWN_ERROR" },
      { status: 500 }
    );
  }
  return NextResponse.json({ message: "Success" });
}
