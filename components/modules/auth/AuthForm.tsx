'use client';
import {
  Button,
  TextInput,
  PasswordInput,
  Divider,
  Text,
  Stack,
  Box,
  Anchor,
} from '@mantine/core';
import google from '@/assets/svg/google.svg';
import Image from 'next/image';
import { useForm } from '@mantine/form';
import Link from 'next/link';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export const AuthForm = ({ mode }: AuthFormProps) => {
  const isRegister = mode === 'register';

  const form = useForm({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length >= 6 ? null : 'Password must be at least 6 characters',

      ...(isRegister && {
        fullName: (value) =>
          value.length > 1 ? null : 'Full name is required',
      }),
    },
  });

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
  };

  const handleSubmit = (values: typeof form.values) => {
    if (isRegister) {
      console.log('Register:', values);
    } else {
      console.log('Login:', values);
    }
  };

  return (
    <Box className="w-full max-w-sm h-full">
      <Stack gap="lg">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-1">
            {isRegister ? 'Create account' : 'Welcome back'}
          </h2>
          <p className="text-gray-500 text-md font-normal">
            {isRegister
              ? 'Sign up to start saving cheats'
              : 'Sign in to your account'}
          </p>
        </div>

        <div>
          <Button
            variant="outline"
            size="lg"
            color="gray"
            radius="md"
            leftSection={
              <Image src={google} alt="Google" width={18} height={18} />
            }
            onClick={handleGoogleSignIn}
            fullWidth
            className="mb-6"
            styles={{
              label: { color: '#374151', fontSize: '16px', fontWeight: 500 },
              root: {
                borderColor: '#e5e7eb',
              },
            }}
          >
            {isRegister ? 'Sign up with Google' : 'Continue with Google'}
          </Button>

          <Divider
            label={isRegister ? 'OR DETAILS' : 'OR EMAIL'}
            labelPosition="center"
            styles={{
              label: {
                color: '#9ca3af',
                fontSize: '12px',
                letterSpacing: '1px',
              },
              root: {
                borderColor: '#f3f4f6',
              },
            }}
          />
        </div>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            {isRegister && (
              <div>
                <Text size="sm" fw={500} mb={8} c="gray.7">
                  Full Name
                </Text>
                <TextInput
                  placeholder="John Doe"
                  size="md"
                  radius="md"
                  required
                  {...form.getInputProps('fullName')}
                  styles={{
                    input: {
                      height: '50px',
                    },
                    label: {
                      fontSize: '16px',
                    },
                  }}
                />
              </div>
            )}
            <div>
              <Text size="sm" fw={500} mb={8} c="gray.7">
                Email
              </Text>
              <TextInput
                placeholder="name@company.com"
                size="md"
                radius="md"
                required
                {...form.getInputProps('email')}
                styles={{
                  input: {
                    height: '50px',
                  },
                  label: {
                    fontSize: '16px',
                  },
                }}
              />
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <Text size="sm" fw={500} c="gray.7">
                  Password
                </Text>
              </div>
              <PasswordInput
                placeholder="••••••••"
                size="md"
                radius={'md'}
                required
                {...form.getInputProps('password')}
                styles={{
                  input: {
                    height: '50px',
                  },
                  label: {
                    fontSize: '16px',
                  },
                }}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              radius="md"
              fullWidth
              variant="filled"
            >
              {isRegister ? 'Create account' : 'Sign in'}
            </Button>
          </Stack>
        </form>

        <Text size="sm" ta="center" c="dimmed" fw={500}>
          {isRegister ? (
            <>
              Already have an account?{' '}
              <Anchor
                component={Link}
                href="/login"
                underline="hover"
                c="dark"
                fw={600}
              >
                Sign in instead
              </Anchor>
            </>
          ) : (
            <>
              Don&apos;t have an account?{' '}
              <Anchor
                component={Link}
                href="/register"
                underline="hover"
                c="dark"
                fw={600}
              >
                Join for free
              </Anchor>
            </>
          )}
        </Text>
        <div>
          <Divider
            styles={{
              root: {
                borderColor: '#f3f4f6',
              },
            }}
          />

          <Text
            size="xs"
            ta="center"
            c="dimmed"
            my="xl"
            fw={'500'}
            lh={'1.5'}
            lts={'1px'}
          >
            © 2024 CHEATSHEETS PLATFORM
          </Text>
        </div>
      </Stack>
    </Box>
  );
};
