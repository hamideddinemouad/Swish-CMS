### Next middleware

```ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const hostname = host.split(':')[0];

  const tenant = hostname.endsWith('.localhost')
    ? hostname.replace('.localhost', '')
    : 'default';

  const headers = new Headers(req.headers);
  headers.set('x-tenant', tenant);

  return NextResponse.next({
    request: { headers },
  });
}
```

### Next page

```ts
import { headers } from 'next/headers';

export default async function Page() {
  const tenant = (await headers()).get('x-tenant') || 'default';

  const res = await fetch('http://api.localhost:4000/projects', {
    headers: { 'x-tenant': tenant },
    cache: 'no-store',
  });

  const data = await res.json();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

### Nest controller

```ts
import { Controller, Get, Headers } from '@nestjs/common';

@Controller('projects')
export class ProjectsController {
  @Get()
  getProjects(@Headers('x-tenant') tenant: string) {
    return {
      tenant: tenant || 'default',
      ok: true,
    };
  }
}
```